export interface IPoint {
  id: string;
  title: string;
  address: string;
  phone_number: string;
  inn: string;
  ogrn: string;
  documents_data: document[];
  social_data: social[];
  audit_log_file_id: string;
  license_file_ids: string[];
  accreditation_file_ids: string[];
}

export interface document {
  date_added: string;
  date_closed: string;
  id: string;
  isTemp: boolean;
  name: string;
}

export interface social {
  link: string;
  name: string;
  social_id: number;
}

export interface IFirma {
  id: string;
  title: string;
  address: string;
  documents_data: document[];
  social_data: social[];
  inn: string;
  ogrn: string;
  name: string;
}

export interface IPointAdd {
  title: string;
  address: string;
  phone_number: string;
  inn: string;
  ogrn: string;
  audit_log_file_id: File;
  license_file_ids: FileList;
  accreditation_file_ids: FileList;
}
