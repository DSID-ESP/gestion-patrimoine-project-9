package sn.douanes.services;

import sn.douanes.entities.Piece;

import java.util.List;

public interface PieceService {

    Piece savePiece(Piece p);
    Piece updatePiece(Piece p);
    void deletePiece(Piece p);
    void deletePieceById(String id);
    Piece getPieceById(String id);
    List<Piece> getAllPiece();



}
