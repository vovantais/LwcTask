import {LightningElement,api} from 'lwc';
import GIT_HUB_LOGO from '@salesforce/resourceUrl/gitHub';

export default class FooterDream extends LightningElement {

    @api imgGit;

    constructor() {
        super();
        this.imgGit = GIT_HUB_LOGO;
    }

}