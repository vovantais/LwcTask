public  class ProductManager {

    static final String CATEGORY_AUTO = System.Label.categoryAuto;

    public static List<Product2> getByFamily() {
        return [SELECT Id,Model__c,
                Price__c,Year__c,
                Description__c FROM
                Product2 WHERE
                Family=:CATEGORY_AUTO];
    }

    public static Product2 getById(String recordId){
        return [SELECT Id FROM Product2 WHERE Id=:recordId];
    }

    public static ContentDocumentLink getAttachmentUrl(String recordId){

//        String attUrlId='';
//       // DateTime dt = System.Now().addMinutes(-1);
//        //AND Attachment.LastModifiedDate >=:dt
//        List<Attachment> picturesAtt= [SELECT Id, Name,
//                                        ContentType FROM Attachment
//                                        WHERE parentid=:recordId
//                                        ];
//        System.debug('=== Size == ' + picturesAtt.size());
//        if(picturesAtt[0] != null){
//            attUrlId = picturesAtt[0].id;
//        }
//        return attUrlId;
        List<ContentDocumentLink> cdLinks = [SELECT ContentDocument.LatestPublishedVersionID,
                                                SystemModstamp FROM ContentDocumentLink WHERE
                                                LinkedEntityId=:recordId ORDER BY SystemModstamp DESC ];

        return cdLinks[0]  != null ? cdLinks[0] : null ;
   }


}


//todo query and LastModifiedDate
////        (ContentDocument.FileExtension='png' OR
////        ContentDocument.FileExtension='jpg' OR
////        ContentDocument.FileExtension='jpeg' OR
////        ContentDocument.FileExtension='gif')

//AND ContentType IN
//('image/png', 'image/jpeg', 'image/gif')  AND ContentType IN('image/png', 'image/jpeg', 'image/gif','image/jpg')