export interface IPoint {
  id: string;
  title: string;
  address: string;
  phone_number: string;
  inn: string;
  ogrn: string;
  audit_log_file_id: string;
  license_file_ids: string[];
  accreditation_file_ids: string[];
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
