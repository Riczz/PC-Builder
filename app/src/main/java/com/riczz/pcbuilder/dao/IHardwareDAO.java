package com.riczz.pcbuilder.dao;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.model.HardwareType;

public interface IHardwareDAO {

    Task<QuerySnapshot> getHardwareById(int id);

    Task<QuerySnapshot> getHardwaresByType(HardwareType type);

    Task<QuerySnapshot> getHardwares();

}
