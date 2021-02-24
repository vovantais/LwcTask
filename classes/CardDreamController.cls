public  class CardDreamController {

    static final String CATEGORY = 'auto';

    @AuraEnabled(cacheable = true)
    public static List<Product2> getCars(){
          return ProductManager.getByFamily(CATEGORY);
    }
    
}