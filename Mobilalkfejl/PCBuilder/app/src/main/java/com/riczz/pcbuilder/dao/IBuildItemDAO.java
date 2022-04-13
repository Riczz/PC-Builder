package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.model.BuildItem;

public interface IBuildItemDAO {

    Task<DocumentReference> saveBuildItem(BuildItem buildItem);

    Task<Void> modifyBuildItem(String id, BuildItem modifiedItem);

    Task<Void> deleteBuildItem(String id);

    Task<QuerySnapshot> getBuildItems();

}
