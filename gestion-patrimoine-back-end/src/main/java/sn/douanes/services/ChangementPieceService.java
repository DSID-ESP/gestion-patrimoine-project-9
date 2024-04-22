package sn.douanes.services;

import sn.douanes.entities.ChangementPiece;
import sn.douanes.entities.Piece;

import java.util.List;

public interface ChangementPieceService {

    ChangementPiece saveChangementPiece(ChangementPiece c);
    ChangementPiece updateChangementPiece(ChangementPiece c);
    void deleteChangementPiece(ChangementPiece c);
    void deleteChangementPieceById(Integer codeChangementPiece, String identifiantMaintenance);
    ChangementPiece getChangementPieceById(Integer codeChangementPiece, String identifiantMaintenance);
    List<ChangementPiece> getAllChangementPieces();


    List<ChangementPiece> getAllChangementPiecesByIdentifiantMaintenance(String identifiantMaintenance);

    ChangementPiece ajouterChangementPiece(Integer codeChangementPiece, String identifiantMaintenance, Piece identifiantPiece, int nombrePieces);


}
