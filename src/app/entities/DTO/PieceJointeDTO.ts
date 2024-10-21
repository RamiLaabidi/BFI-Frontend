export interface PieceJointe {
    id?: number;
    obligatoire?: boolean;
    nomFichier?: String;
    typeMime?: String;
    taille?: number;
    data: File;
  }