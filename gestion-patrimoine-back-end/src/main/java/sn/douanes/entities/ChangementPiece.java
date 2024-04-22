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

    @ManyToOne
    @JoinColumn(name = "IDENTIFIANT_PIECE")
    private Piece identifiantPiece;

    @Column(name = "NOMBRE_PIECES")
    private int nombrePieces;


}
