package sn.douanes.entities.keys;

import sn.douanes.entities.BonPour;

import java.io.Serializable;

public class ArticleBonPourId implements Serializable {

    private Integer codeArticleBonPour;
    private String identifiantBonPour;

    public ArticleBonPourId() {
    }

    public ArticleBonPourId(Integer codeArticleBonPour, String identifiantBonPour) {
        this.codeArticleBonPour = codeArticleBonPour;
        this.identifiantBonPour = identifiantBonPour;
    }
}
