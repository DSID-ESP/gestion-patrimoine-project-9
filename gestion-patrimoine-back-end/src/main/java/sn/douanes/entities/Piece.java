package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PIECE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Piece {

    @Id
    @Column(name = "IDENTIFIANT_PIECE", length = 25, nullable = false)
    private String identifiantPiece;

    @Column(name = "REFERENCE_PIECE", length = 512)
    private String referencePiece;
}
