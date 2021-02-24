public  class CardDreamController {

    @AuraEnabled(cacheable=true)
    public static List<Product2> getCars(){
        return ProductManager.getByFamily();
    }
        
}