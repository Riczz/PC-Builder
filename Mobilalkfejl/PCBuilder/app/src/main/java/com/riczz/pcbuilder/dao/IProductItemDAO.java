package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.QuerySnapshot;

public interface IProductItemDAO {

    Task<QuerySnapshot> getProductById(int id);

    Task<QuerySnapshot> getProducts();

}
