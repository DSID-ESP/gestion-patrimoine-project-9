package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.ChangementPiece;
import sn.douanes.entities.keys.ChangementPieceId;

import java.util.List;

@Repository
public interface ChangementPieceRepository extends JpaRepository<ChangementPiece, ChangementPieceId> {

    List<ChangementPiece> findByIdentifiantMaintenance(String identifiantMaintenance);
}
