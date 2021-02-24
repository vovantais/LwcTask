import { LightningElement,track,wire,api } from 'lwc';
import getCars from '@salesforce/apex/CardDreamController.getCars';
import CAR_DREAM_IMG from '@salesforce/resourceUrl/dataImage';

export default class ContentDream extends LightningElement {

    @api imgCar;
    @api isOpen ;
    @api ready;
    @api value;
    @api Key;
    @api pageNumber;
    @api imgUrl;
    @track data;
    @track copyData;
    @track parts;
    @track selectCar;
    @track currentPage;

    constructor(data,currentPage) {
        super();
        this.imgCar = CAR_DREAM_IMG +'/car.jpg';
        this.data = data;
        this.copyData = [];
        this.parts= [];
        this.isOpen = false;
        this.ready = false;
        this.value = 0;
        this.currentPage = currentPage;
        this.Key = Math.random() *100;
        this.pageNumber = 0;
    }

    @wire(getCars) records({err,data}){
        if(data){
            this.data = data;
            this.ready = true;
            this.copyData = [...data];
            this.slicePagination();
            if(this.parts[0] !== null){
                this.currentPage = this.parts[0];
            }
        }else if (err){
            this.data = undefined;
        }
    }

    rangeValue(event){
        this.value = event.target.value;
        const maxRangeSlider = '100000';
        const rangeBullet = this.template.querySelector('.rs-label');
        rangeBullet.innerHTML = this.value;
        let bulletPosition = (this.value  / maxRangeSlider);
        rangeBullet.style.left = (bulletPosition * 330) + "px";
        this.currentPage = this.copyData.filter(item => item.Price__c >= this.value);
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
        let cars = this.data.filter(item => item.Id === prodid);
        if(cars) {
            this.selectCar = cars[0];
            this.isOpen = true;
        }
    }

    handleModalClick() {
        if(this.isOpen){
            this.isOpen = false;
        }else{
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
        this.currentPage = this.parts[this.pageNumber];
        this.selectElement();
    }

    prevPage(){
        if (this.pageNumber > 0) {
            this.currentPage = this.parts[--this.pageNumber];
            this.selectElement();
        }
    }

    nextPage(){
        if (this.pageNumber < this.parts.length - 1) {
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

}