#import "ExRHMEncrypt.h"
#import <Cordova/CDV.h>
#import <CommonCrypto/CommonCrypto.h>

NSString *EncKey = @"";
NSString *EncIv = @"";

@implementation aesEncrypt
- (NSString*)aesEncrypt:(CDVInvokedUrlCommand*)param
{
    CDVPluginResult* resultFlag = nil;
    NSString *resultJson = @"{,";
    NSString *makeJson = @"";
    NSString *encObj = [param.arguments objectAtIndex:0];
    NSData *data = [encObj dataUsingEncoding:NSUTF8StringEncoding];
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    
    for(NSDictionary *item in json) {
        NSData *aesEncData = [self AES256EncryptWithKey:json[item]]; // dynamic
        
        NSString *encStr = [aesEncData base64EncodedStringWithOptions:0];
        
        makeJson =  [NSString stringWithFormat: @",\"%@\":\"%@\"", item, encStr];
        
        resultJson = [resultJson stringByAppendingString:makeJson];
    }
    resultJson = [resultJson stringByAppendingString:@"}"];
    
    if (param != nil) {
        resultFlag = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:resultJson];
    } else {
        resultFlag = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:resultFlag callbackId:param.callbackId];
    
    return false;
}

- (NSData *)AES256EncryptWithKey:(NSString*) theDataParam
{
    NSData *theData = [theDataParam dataUsingEncoding:NSUTF8StringEncoding];
    
    //    NSData *aesEncData = [self AES128EncryptWithKey:originData :YES]; // static
    
    NSString *key = EncKey;
    NSString *iv = EncIv;
    
    // 'key' should be 32 bytes for AES256, will be null-padded otherwise
    char keyPtr[kCCKeySizeAES256+1]; // room for terminator (unused) // oorspronkelijk 256
    bzero(keyPtr, sizeof(keyPtr)); // fill with zeroes (for padding)
    
    char ivkeyPtr[kCCKeySizeAES128+1];
    bzero(ivkeyPtr, sizeof(ivkeyPtr));
    
    // fetch key data
    [key getCString:keyPtr maxLength:sizeof(keyPtr) encoding:NSUTF8StringEncoding];
    [iv getCString:ivkeyPtr maxLength:sizeof(ivkeyPtr) encoding:NSUTF8StringEncoding];
    
    NSUInteger dataLength = [theData length];
    
    //See the doc: For block ciphers, the output size will always be less than or
    //equal to the input size plus the size of one block.
    //That's why we need to add the size of one block here
    size_t bufferSize = dataLength + kCCBlockSizeAES128;
    
    void *buffer = malloc(bufferSize);
    
    size_t numBytesEncrypted = 0;
    
    CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt, kCCAlgorithmAES128,
                                          kCCOptionPKCS7Padding,
                                          keyPtr, kCCKeySizeAES256, // oorspronkelijk 256
                                          ivkeyPtr /* initialization vector (optional) */,
                                          [theData bytes], dataLength, /* input */
                                          buffer, bufferSize, /* output */
                                          &numBytesEncrypted);
    
    if (cryptStatus == kCCSuccess) {
        //the returned NSData takes ownership of the buffer and will free it on deallocation
        return [NSData dataWithBytesNoCopy:buffer length:numBytesEncrypted];
    }
    
    free(buffer); //free the buffer;
    return nil;
}

- (NSString*)aesDecrypt:(CDVInvokedUrlCommand*)param
{
    CDVPluginResult* resultFlag = nil;
    NSString *resultJson = @"{,";
    NSString *makeJson = @"";
    NSString *encObj = [param.arguments objectAtIndex:0];
    NSData *data = [encObj dataUsingEncoding:NSUTF8StringEncoding];
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    
    for(NSDictionary *item in json) {
        NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:json[item] options:0];
        
        NSData *aesDecData = [self AES256DecryptWithKey:decodedData]; // dynamic
        
        NSString *decStr = [[NSString alloc] initWithData:aesDecData encoding:NSUTF8StringEncoding];
        
        makeJson =  [NSString stringWithFormat: @",\"%@\":\"%@\"", item, decStr];
        
        resultJson = [resultJson stringByAppendingString:makeJson];
    }
    resultJson = [resultJson stringByAppendingString:@"}"];
    
    if (param != nil) {
        resultFlag = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:resultJson];
    } else {
        resultFlag = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:resultFlag callbackId:param.callbackId];
    
    return false;
}

// dynamic aes256 dec
- (NSData*)AES256DecryptWithKey:(NSData*)theData
{
    NSString *key = EncKey;
    NSString *iv = EncIv;
    
    // 'key' should be 32 bytes for AES256, will be null-padded otherwise
    char keyPtr[kCCKeySizeAES256+1]; // room for terminator (unused) // oorspronkelijk 256
    bzero(keyPtr, sizeof(keyPtr)); // fill with zeroes (for padding)
    
    char ivkeyPtr[kCCKeySizeAES128+1];
    bzero(ivkeyPtr, sizeof(ivkeyPtr));
    
    // fetch key data
    [key getCString:keyPtr maxLength:sizeof(keyPtr) encoding:NSUTF8StringEncoding];
    [iv getCString:ivkeyPtr maxLength:sizeof(ivkeyPtr) encoding:NSUTF8StringEncoding];
    
    NSUInteger dataLength = [theData length];
    
    //See the doc: For block ciphers, the output size will always be less than or
    //equal to the input size plus the size of one block.
    //That's why we need to add the size of one block here
    size_t bufferSize = dataLength + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);
    
    size_t numBytesDecrypted = 0;
    
    CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt, kCCAlgorithmAES128,
                                          kCCOptionPKCS7Padding,
                                          keyPtr, kCCKeySizeAES256, // oorspronkelijk 256
                                          ivkeyPtr /* initialization vector (optional) */,
                                          [theData bytes], dataLength, /* input */
                                          buffer, bufferSize, /* output */
                                          &numBytesDecrypted);
    
    if (cryptStatus == kCCSuccess) {
        //the returned NSData takes ownership of the buffer and will free it on deallocation
        return [NSData dataWithBytesNoCopy:buffer length:numBytesDecrypted];
    }
    
    free(buffer); //free the buffer;
    return nil;
}

- (NSString*)setKeyIv:(CDVInvokedUrlCommand*)param
{
    // dynamic
    NSString *dynamicKey = @"";
    NSString *IV = @"";
    CDVPluginResult* resultFlag = nil;
    
    
    @try {
        NSString *token = [param.arguments objectAtIndex:0];
        NSArray *Keymatrix = @[@91,@69,@75,@38,@39,@100,@2,@98,@105,@91,@6,@53,@111,@102,@48,@124,@112,@8,@122,@47,@68,@99,@7,@76,@60,@39,@80,@83,@34,@36,@107,@106];
        NSArray *Ivmatrix = @[@17,@63,@95,@42,@6,@111,@3,@87,@106,@88,@19,@53,@126,@57,@84,@102];
        
        for (int i=0; i<[Keymatrix count]; i++) {
            int keydegit = [Keymatrix[i] intValue];
            NSString *keytmp = [token substringWithRange:NSMakeRange(keydegit-1, 1)];
            dynamicKey = [dynamicKey stringByAppendingString:keytmp];
        }
        
        for (int i=0; i<[Ivmatrix count]; i++) {
            int ivdegit = [Ivmatrix[i] intValue];
            NSString *ivtmp = [token substringWithRange:NSMakeRange(ivdegit-1, 1)];
            IV = [IV stringByAppendingString:ivtmp];
        }
        
        EncKey = dynamicKey;
        EncIv = IV;
        
        NSString *result = [NSString stringWithFormat: @"{\"key\":\"%@\",\"iv\":\"%@\"}", EncKey, EncIv];
        
        if (param != nil) {
            resultFlag = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:result];
        } else {
            resultFlag = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        }
        
        [self.commandDelegate sendPluginResult:resultFlag callbackId:param.callbackId];
        
        return false;
    }
    @catch (NSException *exception) {
        return false;
    }
}

@end
