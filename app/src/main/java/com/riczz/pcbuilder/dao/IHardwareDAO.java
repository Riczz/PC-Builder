package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.QuerySnapshot;

public interface IHardwareDAO {

    Task<QuerySnapshot> getHardwareById(int id);

    Task<QuerySnapshot> getHardwares();

}
