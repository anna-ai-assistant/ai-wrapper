import {ModuleMetadata} from "@nestjs/common";

export interface LibrarianOptions {
  apiKey: string;
  url: string;
  serviceName: string;

  // Ajoutez d'autres options de configuration ici
}

export interface LibrarianAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<LibrarianOptions> | LibrarianOptions;
  inject?: any[];
}