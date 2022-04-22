package com.riczz.pcbuilder;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.riczz.pcbuilder.model.BuildItem;

import java.util.ArrayList;
import java.util.Objects;

public final class BuildViewModel extends ViewModel {

    private final MutableLiveData<ArrayList<BuildItem>> builds = new MutableLiveData<>(new ArrayList<>());

    public void addBuild(BuildItem item) {
        Objects.requireNonNull(builds.getValue()).add(item);
    }

    public ArrayList<BuildItem> getBuilds() {
        return builds.getValue();
    }
}
