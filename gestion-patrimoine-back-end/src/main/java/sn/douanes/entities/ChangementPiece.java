package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.ChangementPieceId;

import javax.persistence.*;

@Entity
@IdClass(ChangementPieceId.class)
@Table(name = "CHANGEMENT_PIECE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangementPiece {

    @Id
    @Column(name = "CODE_CHANGEMENT_PIECE", nullable = false)
    private Integer codeChangementPiece;

    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;


    @Column(name = "NOMBRE_PIECES_RECHANGEES")
    private int nombrePiecesRechangees;


    @Column(name = "REFERENCE_PIECES", length = 512)
    private String referencePieces;

}
