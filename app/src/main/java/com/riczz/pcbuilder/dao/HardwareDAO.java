package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

public class HardwareDAO implements IHardwareDAO {

    private final FirebaseFirestore firestore;

    public HardwareDAO() {
        firestore = FirebaseFirestore.getInstance();
    }

    @Override
    public Task<QuerySnapshot> getHardwareById(int id) {
        return firestore.collection("Hardwares")
                .whereEqualTo("id", id)
                .get();
    }

    @Override
    public Task<QuerySnapshot> getHardwares() {
        return firestore.collection("Hardwares").get();
    }
}
