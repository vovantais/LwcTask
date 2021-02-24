import { LightningElement,track,api, wire } from 'lwc';
import CAR_DREAM_IMG from '@salesforce/resourceUrl/dataImage';
import sendDataImg from '@salesforce/apex/CardDreamController.getDataImg';

export default class ModalDream extends LightningElement {
    imgCar =CAR_DREAM_IMG +'/car.jpg';
    @api imgData;
    @api prodId;
    @api isOpen = false;
    @api product;
    @api showBtn = false;
    @api url ='';
    @api showImg = !false;
    @api showImg1 = !false;
    @track data;
    // @wire(sendDataImg, { recordId: '$prodId',})
    // wiredAccount({ error, data }) {
    //     if (data) {
    //         this.data = data;
    //         console.log('data ',  this.data)
    //     } else if (error) {
    //         this.data = undefined;
    //         console.log('data ',  this.data)
    //     }
    // }
    //@api isModalError = false;
    openModal(){
        this.dispatchEvent(new CustomEvent('modalclick'));
    }

    closeModal(event){
        // console.log('event.target ', event.target.classList.contains('btn__close'));
        if(event.target.classList.contains('btn__close')){
            this.isOpen = !false;
            // this.openModal = !false;
            console.log('this.openModal() ', this.openModal());
        }else{
            this.isOpen = false;
        }
	 }

	changeImage(){
        const formImage = this.template.querySelector('.file__input');
        // const formPreview = this.template.querySelector('.file__preview');
        const downloadImage = this.template.querySelector('.downloadImage');
        const file = formImage.files[0];
         console.log('formImage ', file);
        if(!['image/jpeg','image/png','image/gif'].includes(file.type)){
            //todo message about error
            console.log('==== Error ====');
            //this.isModalError =!false;
            // console.log('this.isModalError ',this.isModalError )
            formImage.value ='';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e)=>{
            this.showBtn = !false;
            downloadImage.src= e.target.result;
            this.imgData = e.target.result;
        }
        reader.onerror = (e)=>{
            //todo message about error
            console.log('==== Error ====');
        }
        reader.readAsDataURL(file);
	 }

     downloadImg(){
        const element  =this.template.querySelector('.about-auto-content');
        this.prodId = element.getAttribute('data-prodid');

        console.log('prodId ',   this.prodId)

        // setTimeout(()=>{
            // this.url = this.data + this.prodId;
            //this.url = 'https://communitydomain.force.com/carddreamlwc/servlet/servlet.FileDownload?file='  + this.prodId;
            //'https://senla-a-dev-ed.my.salesforce.com/sfc/servlet.shepherd/version/download/'
            //this.showImg = false;
            //sendDataImg({recordId: this.prodId})
        // },10000)
         //sendDataImg({recordId: this.prodId})
        this.isOpen = !false;
    }

    get acceptedFormats() {
        return ['.jpeg', '.png', '.gif' , '.jpg'];
    }

    // handleUploadFinished(event) {
    //     // Get the list of uploaded files
    //     const uploadedFiles = event.detail.files;
    //     console.log("No. of files uploaded : " + uploadedFiles.length);
    // }

    onloadImg (event){
        console.log('=========', event)
        sendDataImg({recordId: this.prodId})
        this.showImg = false;
        this.showImg1 = false;
            // .then( (result) => {
            //     this.data = result;
            //     console.log('result ',   this.data)
            //
            // })
            // .catch(error => {
            //     this.data = error;
            // });

    }
}