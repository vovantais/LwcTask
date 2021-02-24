public  class CardDreamController {

    public static String category = 'auto';

    @AuraEnabled(cacheable = true)
    public static List<Product2> getCars(){
          return ProductManager.getByFamily(category);
    }
    
}