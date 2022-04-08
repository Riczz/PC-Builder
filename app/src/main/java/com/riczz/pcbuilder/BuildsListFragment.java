package com.riczz.pcbuilder;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.TypedArray;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.riczz.pcbuilder.adapter.BuildItemAdapter;
import com.riczz.pcbuilder.model.BuildItem;
import com.riczz.pcbuilder.model.CPU;
import com.riczz.pcbuilder.model.GPU;
import com.riczz.pcbuilder.model.Manufacturer;
import com.riczz.pcbuilder.model.Memory;

import java.util.ArrayList;

public class BuildsListFragment extends Fragment {

    private static final String TAG = BuildsListFragment.class.getName();

    private Context context;
    private RecyclerView recyclerView;
    private ArrayList<BuildItem> builds;
    private BuildItemAdapter buildAdapter;

    private FirebaseFirestore firestore;
    private CollectionReference collectionReference;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.builds_fragment, container, false);
        this.context = getContext();

        recyclerView = view.findViewById(R.id.builds_list);
        recyclerView.setLayoutManager(new LinearLayoutManager(context, RecyclerView.VERTICAL, false));
        builds = new ArrayList<>();

        buildAdapter = new BuildItemAdapter(context, builds);
        recyclerView.setAdapter(buildAdapter);

//        initializeData();

//        collectionReference.get().addOnSuccessListener(queryDocumentSnapshots -> {
//            for (QueryDocumentSnapshot document : queryDocumentSnapshots) {
//                BuildItem item = document.toObject(BuildItem.class);
//                builds.add(document.toObject(BuildItem.class));
//                buildAdapter.notifyDataSetChanged();
//            }
//        });
        return view;
    }

    // Teszteléshez
    @SuppressLint("ResourceType")
    private void initializeData() {

        firestore = FirebaseFirestore.getInstance();
        collectionReference = firestore.collection("Hardwares");

        TypedArray cpuImages = getResources().obtainTypedArray(R.array.cpu_images);
        TypedArray gpuImages = getResources().obtainTypedArray(R.array.gpu_images);
        TypedArray ramImages = getResources().obtainTypedArray(R.array.ram_images);
        TypedArray psuImages = getResources().obtainTypedArray(R.array.psu_images);
        TypedArray caseImages = getResources().obtainTypedArray(R.array.case_images);
        TypedArray coolerImages = getResources().obtainTypedArray(R.array.cooler_images);
        TypedArray moboImages = getResources().obtainTypedArray(R.array.motherboard_images);

        int hardwareId = 0;

        collectionReference.add(new CPU(++hardwareId, Manufacturer.INTEL, "Intel Core i5 9400f", 140, 65, cpuImages.getResourceId(0,0), 6, 6, CPU.Architecture.COFFEE_LAKE, CPU.Socket.LGA_1151, Memory.MemoryType.DDR_4, "2900 Mhz"));
        collectionReference.add(new CPU(++hardwareId, Manufacturer.INTEL, "Intel Core i5-12600KF 10-Core 2.80GHz", 325, 125, cpuImages.getResourceId(1,0), 10, 16, CPU.Architecture.KABY_LAKE, CPU.Socket.LGA_1700, Memory.MemoryType.DDR_4, "2800 Mhz"));
        collectionReference.add(new CPU(++hardwareId, Manufacturer.INTEL, "Intel Core i7-10700F 8-Core 2.9GHz", 253, 65, cpuImages.getResourceId(2,0), 8, 16, CPU.Architecture.COMET_LAKE, CPU.Socket.LGA_1200, Memory.MemoryType.DDR_4, "2900 Mhz"));
        collectionReference.add(new CPU(++hardwareId, Manufacturer.AMD, "AMD Ryzen 5 5600X 6-Core 3.7GHz", 230, 65, cpuImages.getResourceId(3,0), 6, 12, CPU.Architecture.ZEN_3, CPU.Socket.AM_4, Memory.MemoryType.DDR_4, "3700 Mhz"));
        collectionReference.add(new CPU(++hardwareId, Manufacturer.AMD, "AMD Ryzen 7 5700X 8-Core 3.4 GHz", 312, 65, cpuImages.getResourceId(4,0), 8, 16, CPU.Architecture.ZEN_3, CPU.Socket.AM_4, Memory.MemoryType.DDR_4, "3200 Mhz"));

        collectionReference.add(new GPU(++hardwareId, "ASUS GeForce GTX 1660 SUPER 6GB GDDR6", 148599, 120, gpuImages.getResourceId(0, 0), 6, "1830 Mhz"));
        collectionReference.add(new GPU(++hardwareId, "SAPPHIRE Radeon NITRO+ RX 6700 XT 12GB GDDR6", 312160, 260, gpuImages.getResourceId(1, 0), 12, "2622 Mhz"));
        collectionReference.add(new GPU(++hardwareId, "ASUS GeForce RTX 3060 12GB GDDR6", 256840, 170, gpuImages.getResourceId(2, 0), 6, "1320 Mhz"));
        collectionReference.add(new GPU(++hardwareId, "SAPPHIRE Radeon RX 6500 XT 4GB GDDR6", 97815, 130, gpuImages.getResourceId(3, 0), 4, "2825 Mhz"));
        collectionReference.add(new GPU(++hardwareId, "ASUS Radeon RX 6600 XT 8GB OC GDDR6 128bit", 210000, 160, gpuImages.getResourceId(4, 0), 8, "2607 Mhz"));
    }
}
