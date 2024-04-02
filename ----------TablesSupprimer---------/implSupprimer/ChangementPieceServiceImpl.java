package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.ChangementPieceRepository;
import sn.douanes.servicesSupprimer.ChangementPieceService;

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
    public void deleteChangementPieceById(String id) {
        changementPieceRepository.deleteById(id);
    }

    @Override
    public ChangementPiece getChangementPiece(String id) {
        return changementPieceRepository.findById(id).get();
    }

    @Override
    public List<ChangementPiece> getAllChangementPieces() {
        return changementPieceRepository.findAll();
    }



}
