package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Piece;
import sn.douanes.repositories.PieceRepository;
import sn.douanes.services.PieceService;

import java.util.List;


@Service
public class PieceServiceImpl implements PieceService {

    @Autowired
    PieceRepository pieceRepository;

    @Override
    public Piece savePiece(Piece p) {
        return pieceRepository.save(p);
    }

    @Override
    public Piece updatePiece(Piece p) {
        return pieceRepository.save(p);
    }

    @Override
    public void deletePiece(Piece p) {
        pieceRepository.delete(p);
    }

    @Override
    public void deletePieceById(String id) {
        pieceRepository.deleteById(id);
    }

    @Override
    public Piece getPieceById(String id) {
        return pieceRepository.findById(id).isPresent() ? pieceRepository.findById(id).get() : null;
    }

    @Override
    public List<Piece> getAllPiece() {
        return pieceRepository.findAll();
    }


//    @Override
//    public Piece ajouterPiece(
//            String codePiece,
//            String libellePiece
//    ) {
//
//        Piece Piece = new Piece();
//
//        Piece.setCodePiece(codePiece);
//        Piece.setLibellePiece(libellePiece);
//
//        return PieceRepository.save(Piece);
//    }


}
