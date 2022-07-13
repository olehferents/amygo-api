import { ApiProperty } from '@nestjs/swagger';

export class AddDocumentsDto {
  @ApiProperty({
    title: 'Attachment',
    description:
      'Size < 5Mb and format [jpg, png, svg, tiff, webp, .pdf, .txt, .doc]',
    type: 'file',

    required: false,
  })
  documents: any;
}
