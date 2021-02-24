import { LightningElement,api } from 'lwc';
import CAR_DREAM_IMG from '@salesforce/resourceUrl/dataImage';

export default class ModalDream extends LightningElement {

    @api imgCar;
    @api prodId;
    @api isOpen;
    @api product;

    constructor() {
        super();
        this.prodId = null;
        this.isOpen = false;
        this.product = [];
        this.imgCar = CAR_DREAM_IMG + '/car.jpg';
    }
    
    get acceptedFormats() {
        return ['.jpeg', '.png', '.gif' , '.jpg'];
    }

    openModal(){
        this.dispatchEvent(new CustomEvent('modalclick'));
    }

    closeModal(event){
        this.isOpen = false;
    }

    downloadImg(){
        const element  = this.template.querySelector('.about-auto-content');
        this.prodId = element.getAttribute('data-prodid');
    }

}