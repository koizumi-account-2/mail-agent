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
          return removeQuotedText(decodeBase64(part.body.data));
        }
            }
        }
    }

    // partsがない場合、payload.bodyから直接データを取得
  if (payload.body?.data) {
    return removeQuotedText(decodeBase64(payload.body.data));
  }
  return "";
}
// Base64URLデコード
function decodeBase64(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  return decoded;
} 

function removeQuotedText(body: string): string {
const lines = body.split('\n');
const cleanLines: string[] = [];

const quotePatterns = [
  /^On .+ wrote:$/,
  /^> .+/,
  /^From: .+/,
  /^-----Original Message-----$/,
  /^---+ Forwarded message ---+$/,
  /^.+さんは書きました:$/
];

for (const line of lines) {
  if (quotePatterns.some(p => p.test(line.trim()))) break;
  cleanLines.push(line);
}


 return removeAngleBracketLinks(cleanLines.join('\n').trim());
}

function removeAngleBracketLinks(text: string): string {
  return text.replace(/<https?:\/\/[^>]+>/g, '');
}