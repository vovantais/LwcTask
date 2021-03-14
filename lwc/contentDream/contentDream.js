import { LightningElement,track,wire,api } from 'lwc';
import getCars from '@salesforce/apex/CardDreamController.getCars'

export default class ContentDream extends LightningElement {

    @api isOpen ;
    @api ready;
    @api value;
    @api Key;
    @api pageNumber;
    @api imgUrl;
    @api rangeBullet;
    @api flag;
    @api pages;

    @track data;
    @track copyData;
    @track parts;
    @track selectCar;
    @track currentPage;

    constructor() {
        super();
        this.data = [];
        this.copyData = [];
        this.parts = [];
        this.isOpen = false;
        this.ready = false;
        this.value = 0;
        this.currentPage = [];
        this.Key = Math.random() * 100;
        this.pageNumber = 0;
        this.rangeBullet = '';
        this.flag = false;
        this.pages = [];
    }

    @wire(getCars) records({err,data}){
        if(data){
            this.data = data;
            this.ready= true;
            this.copyData = [...data];
            this.slicePagination();
            if (this.parts[0] !== null){
                this.currentPage = this.parts[0];
                this.countPages();
            }
        }else if (err){
            this.data = undefined;
        }
    }

    rangeValue(event){
        this.value = event.target.value;
        const maxRangeSlider = '100000';
        this.rangeBullet = this.template.querySelector('.rs-label');
        this.rangeBullet.innerHTML = this.value;
        let bulletPosition = (this.value  / maxRangeSlider);
        this.rangeBullet.style.left = (bulletPosition * 330) + "px";
        this.currentPage = this.copyData.filter(item => item.Price__c>=this.value);
    }

    search(event){
        let search = event.target.value.toLowerCase();
        if (search.length > 0) {
            let reg = new RegExp(`${search}{0,}`);
            this.currentPage = this.copyData.filter(item => reg.test(item.Model__c.toLowerCase()));
        }
    }

    showCardItem(event){
        const prodid = event.currentTarget.dataset.prodid;
        let cars = this.data.filter(item=>item.Id === prodid);
        if(cars) {
            this.selectCar = cars[0];
            this.isOpen = true;
        }
    }

    handleModalClick() {
        if (this.isOpen){
            this.isOpen = false;
            if (this.flag){
                location.reload();
            }
            this.flag = true;
        } else{
            this.isOpen = true;
        }
    }

    slicePagination(){
        const count = 4;
        for (let i = 0; i < this.data.length; i = i + count) {
            const [...newArray] = this.data;
            this.parts.push(newArray.splice(i, count));
        }
    }

    selectPage(event){
        this.pageNumber = +event.target.textContent;
        this.currentPage = this.parts[--this.pageNumber];
        if (this.value !== 0){
            this.value = 0;
            this.rangeBullet.innerHTML = '';
        }
        this.template.querySelector('.search-input').value = '';
        this.selectElement();
    }

    prevPage(){
        if (this.pageNumber > 0) {
            this.currentPage = this.parts[--this.pageNumber];
            this.selectElement();
        }
    }

    nextPage(){
        if (this.pageNumber < this.parts.length-1) {
            this.currentPage = this.parts[++this.pageNumber];
            this.selectElement();
        }
    }

    selectElement(){
        const select = this.template.querySelectorAll('.selectPage');
        for ( let i = 0; i < select.length; i++){
            if (select[i].classList.contains('active')){
                select[i].classList.remove('active');
            }
        }
        select[this.pageNumber].classList.add('active');
    }

    countPages(){
        for (let i = 1; i < this.parts[0].length; i++){
            this.pages.push(i);
        }
    }
}
