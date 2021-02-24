@isTest
public  class CardDreamControllerTest {

    @testSetup static void setup(){

        Product2 prod = new Product2();
        prod.Family = 'auto';
        prod.Name = 'car-Bmw';
        prod.Model__c ='Bmw';
        prod.Price__c =10000;
        prod.Year__c = Date.today();
        prod.Description ='New car';

        insert prod;
    }

    static testMethod void  getCarsTest(){

        List<Product2> prod =CardDreamController.getCars();
        prod=[SELECT Id,Family,Description FROM Product2 WHERE Family='auto'];

        System.assertEquals('New car', String.valueOf(prod[0].Description));
    }

}