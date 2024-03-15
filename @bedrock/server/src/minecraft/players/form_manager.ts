import type { ModalFormResponsePacket } from "@bedrock/protocol";
import { ModalFormRequestPacket } from "@bedrock/protocol";
import type { Player } from "./plugs.js";

let ids = 0;

/// ////////// GENERAL
export class FormResponse{
    public readonly canceled: boolean;
    public readonly cancelationReason?: CancelationReason;
    protected constructor(canceled?: boolean, reason?: CancelationReason){ this.canceled = canceled??true; this.cancelationReason = reason; }
}
export class FormTimeoutRejection extends ReferenceError{
    public constructor(){super("Form has timed out.");}
}
export enum FormType{
	"ActionForm" = "form",
	"MessageForm" = "modal"
}
export enum CancelationReason{
    Canceled = 0,
    UserBusy = 1
}
export class FormData<T extends FormResponse>{
	protected _title: string = "TITLE";
	protected type: FormType = FormType.MessageForm;
	protected constructor(type: FormType, title?: string){
		this._title = title??"";
		this.type = type;
	}
	public toJSON(): any{
		return {
			type:this.type,
			title:this._title
		};
	}
	public title(title: string){this._title = title; return this;}
    public async show(player: Player): Promise<T>{ return player.formManager.sendForm(this); }
}



/// ///////////////// MESSAGE FORM

export class MessageFormResponse extends FormResponse{
    public readonly selection?: 0 | 1;
    public constructor(value: any, reason?: CancelationReason){
        super(reason !== undefined, reason);
        if(reason === undefined) this.selection = value?1:0;
    }
}
export class MessageFormData extends FormData<MessageFormResponse>{
	protected _button1: string;
	protected _button2: string;
    protected _content: string = "CONTENT";
	public constructor(title?: string, body?: string){
		super(FormType.MessageForm, title);
        if(body) this._content = body;
		this._button1 = "button1";
		this._button2 = "button2";
	}
	public toJSON(){
		const data = super.toJSON();
		data.button1 = this._button1;
		data.button2 = this._button2;
        data.content = this._content;
		return data;
	}
    public button1(content: string){
        this._button1 = content;
        return this;
    }
    public button2(content: string){
        this._button2 = content;
        return this;
    }
    public body(content: string){
        this._content = content;
        return this;
    }
}



export interface ActionFormButton{
    image?: {
        data: string,
        type: "path" | "url"
    },
    text: string
}
export class ActionFormResponse extends FormResponse{
    public readonly selection?: number;
    public constructor(value: any, reason?: CancelationReason){
        super(reason !== undefined, reason);
        if(reason === undefined) this.selection = Number(value);
    }
}
export class ActionFormData extends  FormData<ActionFormResponse>{
	protected _buttons: ActionFormButton[] = [];
    protected _content: string = "CONTENT";
	public constructor(title?: string, body?: string){
		super(FormType.ActionForm, title);
        if(body) this._content = body;
	}
	public toJSON(){
		const data = super.toJSON();
		data.buttons = this._buttons;
        data.content = this._content;
		return data;
	}
    public button(content: string, icon?: string, isUrl: boolean = false){
        if(icon) this._buttons.push({text: content, image: {data: icon, type: isUrl?"url":"path"}});
        else this._buttons.push({text: content});
        return this;
    }
    public body(content: string){
        this._content = content;
        return this;
    }
}



export class FormManager{
    protected readonly forms = new Map<number, {callback(T: any): void, timeout: NodeJS.Timeout, type:FormType}>();
    public readonly player;
    public constructor(player: Player){
        this.player = player;
    }
    public async sendForm(payload: FormData<FormResponse>): Promise<any>{
        const packet = new ModalFormRequestPacket();
        const id = packet.formId = ids++;
        const data = payload.toJSON();
        packet.jsonPayload = JSON.stringify(payload);
        this.player.context.updates.add(packet);
        return new Promise((resolve, reject)=>{
            const timeout = setTimeout(()=>{
                this.forms.delete(id);
                reject(new FormTimeoutRejection());
            }, 10 * 60 * 1_000); // 10min timeout
            this.forms.set(id, {timeout, type:data.type, callback: resolve});
        });
    }
    public resolve(packet: ModalFormResponsePacket){
        const id = packet.formId;
        const payload = packet.jsonPayload;
        const data = this.forms.get(id);
        if(data){
            clearTimeout(data.timeout);
            this.forms.delete(id);
            switch(data.type){
                case FormType.MessageForm:
                    data.callback(new MessageFormResponse(payload?.startsWith("true"),packet.cancelationReason));
                    break;
                default:
                    data.callback(new MessageFormResponse(payload?Number(payload):undefined,packet.cancelationReason));
                    break;
            }
        }
    }
}
