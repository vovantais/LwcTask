import {api, LightningElement} from 'lwc';
import CAR_DREAM_LOGO from '@salesforce/resourceUrl/dataImage';

export default class HeaderDream extends LightningElement {

    @api imgLogo;

    constructor() {
        super();
        this.imgLogo = CAR_DREAM_LOGO + '/logo.png';
    }

}