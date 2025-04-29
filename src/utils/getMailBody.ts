import { GmailMessagePart } from "@/types/gmail";

// メッセージの本文を取得する
export function getMailBody(payload:GmailMessagePart | undefined) {
    if(!payload){
        return "";
    }
    // payload.parts が存在する場合、そこから探す
    if (payload.parts) {
        for (const part of payload.parts) {
            if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
                if (part.body?.data) {
                    return decodeBase64(part.body.data);
                }
            }
        }
    }

    // partsがない場合、payload.bodyから直接データを取得
    if (payload.body?.data) {
        return decodeBase64(payload.body.data);
    }
    return "";
}
// Base64URLデコード
function decodeBase64(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  return decoded;
} 