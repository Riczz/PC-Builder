package com.riczz.pcbuilder.model;

import com.google.firebase.Timestamp;
import com.google.firebase.firestore.Exclude;
import com.riczz.pcbuilder.R;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class BuildItem implements Serializable {

    private int totalPrice, totalWattage;
    private Timestamp modificationDate;
    private String id, title, description;
    private Integer manufacturerIconId;
    private List<Integer> hardwareIds, iconIds;
    @Exclude
    private List<Hardware> hardwares;

    public BuildItem(String title, int toalPrice, int totalWattage, ArrayList<Hardware> hardwares) {
        this(title, toalPrice, totalWattage);

        for (Hardware hardware : hardwares) {
            this.hardwares.add(hardware);
            this.hardwareIds.add(hardware.getId());
            this.iconIds.add(hardware.getIconId());

            this.description = this.description.concat(hardware.getName() + " ");

            if (hardware.getType().equals(HardwareType.CPU)) {
                this.manufacturerIconId = ((CPU) hardware).getManufacturer().getIconResourceId();
            }
        }
    }

    public BuildItem(String title, int totalPrice, int totalWattages) {
        this(title);
        this.totalPrice = totalPrice;
        this.totalWattage = totalWattages;
    }

    public BuildItem(String title) {
        this.title = title;
        this.totalPrice = 0;
        this.totalWattage = 0;
        this.description = "";
        this.hardwares = new ArrayList<>();
        this.hardwareIds = new ArrayList<>();
        this.iconIds = new ArrayList<>();
        this.manufacturerIconId = R.drawable.ic_no_cpu;
        this.modificationDate = Timestamp.now();
    }

    public BuildItem() {
    }

    @Exclude
    public HashMap<String, Hardware> getComponentsMap() {
        HashMap<String, Hardware> components = new HashMap<>();
        for (Hardware h : hardwares) {
            components.put(h.getTypeName(), h);
        }
        return components;
    }

    @Exclude
    public List<Hardware> getHardwares() {
        return hardwares;
    }

    @Exclude
    public void setHardwares(List<Hardware> hardwares) {
        this.hardwares = hardwares;
    }

    @Exclude
    public String getId() {
        return id;
    }

    @Exclude
    public void setId(String id) {
        this.id = id;
    }

    public Timestamp getModificationDate() {
        return modificationDate;
    }

    public String getTitle() {
        return title;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public int getTotalWattage() {
        return totalWattage;
    }

    public String getDescription() {
        return description;
    }

    public List<Integer> getHardwareIds() {
        return hardwareIds;
    }

    public Integer getManufacturerIconId() {
        return manufacturerIconId;
    }

    public List<Integer> getIconIds() {
        return iconIds;
    }
}
