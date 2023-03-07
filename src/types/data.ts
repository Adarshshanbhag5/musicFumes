export type musicData = {
  album: string;
  artist: string;
  title: string;
  id: string;
  duration: number;
  url: string;
  contentType: string;
  artwork: string;
};

export type fsDataType = {
  path: string;
  files: musicData[];
  totalFiles: number;
  folderHierarchy: string[];
  totalDuration: string;
};
