package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.model.BuildItem;

public final class BuildItemDAO implements IBuildItemDAO {
    @Override
    public Task<DocumentReference> saveBuildItem(BuildItem buildItem) {
        return FirebaseFirestore.getInstance()
                .collection("Builds")
                .add(buildItem);
    }

    @Override
    public Task<Void> modifyBuildItem(String id, BuildItem modifiedItem) {
        return FirebaseFirestore.getInstance()
                .collection("Builds")
                .document(id)
                .set(modifiedItem);
    }

    @Override
    public Task<Void> deleteBuildItem(String id) {
        return FirebaseFirestore.getInstance()
                .collection("Builds")
                .document(id)
                .delete();
    }

    @Override
    public Task<QuerySnapshot> getBuildItems() {
        return FirebaseFirestore.getInstance()
                .collection("Builds")
                .orderBy("modificationDate", Query.Direction.DESCENDING)
                .get();
    }
}
