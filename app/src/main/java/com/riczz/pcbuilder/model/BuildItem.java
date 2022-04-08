package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;
import com.riczz.pcbuilder.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BuildItem {

    private int totalPrice, totalWattage;
    private String title, description;
    private Integer manufacturerIconId;
    private List<Integer> hardwareIds, iconIds;

    @Exclude
    private List<Hardware> hardwares;

    public BuildItem(String title, Hardware... hardwares) {
        this.title = title;
        this.totalPrice = 0;
        this.totalWattage = 0;
        this.description = "";

        this.hardwares = Arrays.asList(hardwares);
        this.hardwareIds = new ArrayList<>();
        this.iconIds = new ArrayList<>();
        this.manufacturerIconId = R.drawable.ic_amd_logo;

        for (Hardware hardware : hardwares) {
            this.totalPrice += hardware.getPrice();
            this.totalWattage += hardware.getWattage();
            this.description = this.description.concat(hardware.getName() + " ");
            this.hardwareIds.add(hardware.getId());

            this.iconIds.add(hardware.getIconId());

            if (hardware.getType().equals(HardwareType.CPU)) {
                this.manufacturerIconId = ((CPU)hardware).getManufacturer().getIconResourceId();
            }
        }
    }

    public BuildItem(String title) {
        this.title = title;
    }

    public BuildItem() {
    }

    @Exclude
    public Hardware getHardware(HardwareType type) {
        if (this.hardwares == null) {
            return null;
        }

        for (Hardware h : this.hardwares) {
            if (h.getType().equals(type)) {
                return h;
            }
        }
        return null;
    }

    @Exclude
    public List<Hardware> getHardwares() {
        return hardwares;
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
