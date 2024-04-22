package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.ChangementPiece;
import sn.douanes.entities.Piece;
import sn.douanes.entities.keys.ChangementPieceId;
import sn.douanes.repositories.ChangementPieceRepository;
import sn.douanes.services.ChangementPieceService;

import java.util.List;

@Service
public class ChangementPieceServiceImpl implements ChangementPieceService {

    @Autowired
    ChangementPieceRepository changementPieceRepository;

    @Override
    public ChangementPiece saveChangementPiece(ChangementPiece c) {
        return changementPieceRepository.save(c);
    }

    @Override
    public ChangementPiece updateChangementPiece(ChangementPiece c) {
        return changementPieceRepository.save(c);
    }

    @Override
    public void deleteChangementPiece(ChangementPiece c) {
        changementPieceRepository.delete(c);
    }

    @Override
    public void deleteChangementPieceById(Integer codeChangementPiece, String identifiantMaintenance) {
        changementPieceRepository.deleteById(new ChangementPieceId(codeChangementPiece, identifiantMaintenance));
    }

    @Override
    public ChangementPiece getChangementPieceById(Integer codeChangementPiece, String identifiantMaintenance) {
        return changementPieceRepository.findById(new ChangementPieceId(codeChangementPiece, identifiantMaintenance)).orElse(null);
    }

    @Override
    public List<ChangementPiece> getAllChangementPieces() {
        return changementPieceRepository.findAll();
    }

    @Override
    public List<ChangementPiece> getAllChangementPiecesByIdentifiantMaintenance(String identifiantMaintenance) {
        return changementPieceRepository.findByIdentifiantMaintenance(identifiantMaintenance);
    }

    @Override
    public ChangementPiece ajouterChangementPiece(
            Integer codeChangementPiece,
            String identifiantMaintenance,
            Piece identifiantPiece,
            int nombrePieces
    ) {

        ChangementPiece ChangementPiece = new ChangementPiece();

        ChangementPiece.setCodeChangementPiece(codeChangementPiece);
        ChangementPiece.setIdentifiantMaintenance(identifiantMaintenance);
        ChangementPiece.setIdentifiantPiece(identifiantPiece);
        ChangementPiece.setNombrePieces(nombrePieces);

        return changementPieceRepository.save(ChangementPiece);
    }



}
