package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

public class ProductItemDAO implements IProductItemDAO {

    private final FirebaseFirestore firestore;

    public ProductItemDAO() {
        firestore = FirebaseFirestore.getInstance();
    }

    @Override
    public Task<QuerySnapshot> getProductById(int id) {
        return firestore.collection("Products")
                .whereEqualTo("id", id)
                .get();
    }

    @Override
    public Task<QuerySnapshot> getProducts() {
        return firestore.collection("Products").get();
    }
}
