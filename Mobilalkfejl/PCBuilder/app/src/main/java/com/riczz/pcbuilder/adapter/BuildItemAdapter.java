package com.riczz.pcbuilder.adapter;

import android.app.AlertDialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.imageview.ShapeableImageView;
import com.riczz.pcbuilder.BuildsListFragment;
import com.riczz.pcbuilder.R;
import com.riczz.pcbuilder.dao.BuildItemDAO;
import com.riczz.pcbuilder.model.BuildItem;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;

public class BuildItemAdapter extends RecyclerView.Adapter<BuildItemAdapter.ViewHolder> {

    private ArrayList<BuildItem> builds;
    private BuildsListFragment fragment;
    private Context context;

    public BuildItemAdapter(BuildsListFragment fragment, ArrayList<BuildItem> builds) {
        this.builds = builds;
        this.fragment = fragment;
        this.context = fragment.getContext();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.build_item, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bindTo(builds.get(position), position);
    }

    @Override
    public int getItemCount() {
        return builds.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        //TODO: Wattage
        private MaterialCardView itemButton;
        private TextView title, wattage, price, description;
        private LinearLayout iconsLayout;
        private ImageView manufacturer;
        private MaterialButton deleteButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            title = itemView.findViewById(R.id.build_item_title);
            price = itemView.findViewById(R.id.build_item_price);
            iconsLayout = itemView.findViewById(R.id.build_item_icons);
            deleteButton = itemView.findViewById(R.id.build_item_delete);
            itemButton = itemView.findViewById(R.id.build_item_card_button);
            description = itemView.findViewById(R.id.build_item_description);
            manufacturer = itemView.findViewById(R.id.build_item_cpu_manufacturer);
        }

        public void bindTo(BuildItem item, int position) {
            title.setText(StringUtils.upperCase(item.getTitle()));
            price.setText(
                    context.getString(R.string.price_format,
                            String.valueOf(item.getTotalPrice()),
                            context.getString(R.string.currency))
            );
            description.setText(item.getDescription());

            LayoutInflater inflater = LayoutInflater.from(context);

            for (int iconId : item.getIconIds()) {
                ShapeableImageView icon = (ShapeableImageView) inflater.inflate(R.layout.icon, iconsLayout, false);
                Glide.with(context).load(iconId).into(icon);
                iconsLayout.addView(icon);
            }
            Glide.with(context).load(item.getManufacturerIconId()).override(150).into(manufacturer);

            deleteButton.setOnClickListener(button -> {
                new AlertDialog.Builder(context)
                        .setTitle("Delete build")
                        .setMessage("Are you sure you want to delete this build?")
                        .setPositiveButton(android.R.string.yes, (dialogInterface, i) -> {
                            new BuildItemDAO().deleteBuildItem(item.getId()).addOnSuccessListener(runnable -> {
                                builds.remove(position);
                                notifyItemRemoved(position);
                                notifyItemRangeChanged(position, getItemCount());
                            });
                        })
                        .setNegativeButton(android.R.string.no, null).show();
            });

            itemButton.setOnClickListener(button -> {
                new AlertDialog.Builder(context)
                        .setTitle("Modify build")
                        .setMessage("Are you sure you want to modify this build?")
                        .setPositiveButton(android.R.string.yes, (dialogInterface, i) -> {
                            fragment.modifyBuild(item);
                        })
                        .setNegativeButton(android.R.string.no, null).show();
            });
        }
    }
}
