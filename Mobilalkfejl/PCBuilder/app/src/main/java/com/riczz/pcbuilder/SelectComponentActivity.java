package com.riczz.pcbuilder;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.MenuItemCompat;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.SearchView;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.adapter.RecyclerViewClickListener;
import com.riczz.pcbuilder.adapter.ProductItemAdapter;
import com.riczz.pcbuilder.dao.HardwareDAO;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.HardwareType;
import com.riczz.pcbuilder.model.ProductItem;

import java.util.ArrayList;
import java.util.HashMap;

public class SelectComponentActivity extends AppCompatActivity implements RecyclerViewClickListener {

    private static final String TAG = SelectComponentActivity.class.getName();

    private ArrayList<ProductItem> productItems;
    private RecyclerView productsRecyclerView;
    private ProductItemAdapter adapter;

    private String buildName;
    private HashMap<String, Hardware> components;
    private HardwareType typeFilter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select_component);

        productItems = new ArrayList<>();
        adapter = new ProductItemAdapter(this, productItems, this);

        productsRecyclerView = findViewById(R.id.productsRecyclerView);
        productsRecyclerView.setLayoutManager(new GridLayoutManager(this, 1));
        productsRecyclerView.setAdapter(adapter);

        buildName = getIntent().getStringExtra("BUILD_NAME");
        components = (HashMap<String, Hardware>) getIntent().getSerializableExtra("COMPONENTS");
        typeFilter = (HardwareType) getIntent().getSerializableExtra("HW_FILTER");

        queryProducts();

    }

    private void queryProducts() {
        productItems.clear();
        ArrayList<Integer> hardwareIds = new ArrayList<>();

        Task<QuerySnapshot> task =
                new HardwareDAO().getHardwaresByType(typeFilter);

        task.addOnSuccessListener(documents -> {
            for (DocumentSnapshot document : documents) {
                hardwareIds.add(document.get("id", Integer.class));
            }
        }).addOnSuccessListener(documents -> {
            for (int i = 0; i < hardwareIds.size(); i++) {
                FirebaseFirestore.getInstance()
                        .collection("Products")
                        .whereEqualTo("hardwareId", hardwareIds.get(i)).get()
                        .addOnSuccessListener(documents1 -> {
                            productItems.add(documents1.getDocuments().get(0).toObject(ProductItem.class));
                            adapter.notifyItemInserted(productItems.size()-1);
                        });
            }
        });
    }

    @Override
    public void productClickListener(int position) {
        ProductItem item = productItems.get(position);
        components.put(typeFilter.name(), item.getHardware());
        saveComponents();
        finish();
    }

    @Override
    public void onBackPressed() {
        saveComponents();
        finish();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.products_menu, menu);
        MenuItem searchItem = menu.findItem(R.id.product_search_bar);
        SearchView searchView = (SearchView) MenuItemCompat.getActionView(searchItem);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String s) {
                adapter.getFilter().filter(s);
                return false;
            }
        });
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        return super.onPrepareOptionsMenu(menu);
    }

    private void saveComponents() {
        Intent intent = new Intent();
        intent.putExtra("BUILD_NAME", buildName);
        intent.putExtra("COMPONENTS", components);
        setResult(CreateBuildActivity.REQ_CODE, intent);
    }
}