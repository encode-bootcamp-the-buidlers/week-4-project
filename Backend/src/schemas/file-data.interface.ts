import { FileDataDto } from 'src/contracts/dtos/file-data.dto';
import { IpfsDataDto } from 'src/contracts/dtos/ipfs-data.dto';
import { MetadataDto } from 'src/contracts/dtos/metadata.dto';

export class FileData {
  constructor(
    public file?: FileDataDto,
    public metadata?: MetadataDto,
    public ipfs?: IpfsDataDto,
  ) {}
}
