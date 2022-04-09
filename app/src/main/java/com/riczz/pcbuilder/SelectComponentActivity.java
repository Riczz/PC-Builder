package com.riczz.pcbuilder;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.adapter.ProductItemAdapter;
import com.riczz.pcbuilder.dao.ProductItemDAO;
import com.riczz.pcbuilder.model.HardwareType;
import com.riczz.pcbuilder.model.ProductItem;

import java.io.Serializable;
import java.util.ArrayList;

public class SelectComponentActivity extends AppCompatActivity {

    private static final String TAG = SelectComponentActivity.class.getName();

    private ArrayList<ProductItem> productItems;
    private RecyclerView productsRecyclerView;
    private ProductItemAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select_component);

        productItems = new ArrayList<>();
        adapter = new ProductItemAdapter(this, productItems);

        productsRecyclerView = findViewById(R.id.productsRecyclerView);
        productsRecyclerView.setLayoutManager(new GridLayoutManager(this, 1));
        productsRecyclerView.setAdapter(adapter);

        Task<QuerySnapshot> task =
        new ProductItemDAO().getProducts();

        task.addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots.getDocuments()) {
                productItems.add(document.toObject(ProductItem.class));
            }
            adapter.notifyDataSetChanged();
        });

        Serializable components = getIntent().getSerializableExtra("COMPONENTS");
        HardwareType filter = (HardwareType) getIntent().getSerializableExtra("HW_FILTER");

        Log.e(TAG, "COMP: " + components);
        Log.e(TAG, "FILTER: " + filter.name());
    }
}