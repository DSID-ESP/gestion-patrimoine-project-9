package sn.douanes.entities.keys;

import sn.douanes.entities.BonSortie;

import java.io.Serializable;

public class ArticleBonSortieId implements Serializable {

    private Integer codeArticleBonSortie;
    private String identifiantBonSortie;

    public ArticleBonSortieId() {
    }

    public ArticleBonSortieId(Integer codeArticleBonSortie, String identifiantBonSortie) {
        this.codeArticleBonSortie = codeArticleBonSortie;
        this.identifiantBonSortie = identifiantBonSortie;
    }
}
