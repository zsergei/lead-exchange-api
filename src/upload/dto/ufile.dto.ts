import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    example: 'File uploaded successfully',
    description: 'Message',
  })
  message: string;

  @ApiProperty({
    example: '/uploads/file-1732689477086-718105762.jpg',
    description: 'Path to file',
  })
  filePath: string;
}
