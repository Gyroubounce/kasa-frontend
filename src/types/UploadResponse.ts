export type UploadPurpose = "cover" | "gallery" | "document";

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose: UploadPurpose;
  property_id?: string;
  instructions?: string;
}
