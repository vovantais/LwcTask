import { LightningElement,api } from 'lwc';

export default class ModalDream extends LightningElement {

    @api prodId;
    @api isOpen;
    @api product;

    constructor() {
        super();
        this.prodId = null;
        this.isOpen = false;
        this.product = [];
    }

    get acceptedFormats() {
        return ['.jpeg', '.png', '.gif' , '.jpg'];
    }

    openModal(){
        setTimeout(()=>{
            this.dispatchEvent(new CustomEvent('modalclick'));
        },100)
    }

    closeModal(){
        this.isOpen = false;
    }

    downloadImg(){
        const element  =this.template.querySelector('.about-auto-content');
        this.prodId = element.getAttribute('data-prodid');
    }
}