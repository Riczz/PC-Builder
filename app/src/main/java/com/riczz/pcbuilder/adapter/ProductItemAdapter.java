package com.riczz.pcbuilder.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.R;
import com.riczz.pcbuilder.dao.HardwareDAO;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.HardwareType;
import com.riczz.pcbuilder.model.ProductItem;

import java.util.ArrayList;

public class ProductItemAdapter extends RecyclerView.Adapter<ProductItemAdapter.ViewHolder> {

    private ArrayList<ProductItem> productItems;
    private ArrayList<ProductItem> productItemsAll;
    private Context context;
    private int lastPosition = -1;

    public ProductItemAdapter(Context context, ArrayList<ProductItem> productItems) {
        this.productItems = productItems;
        this.productItemsAll = productItems;
        this.context = context;
    }

    @NonNull
    @Override
    public ProductItemAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.product_item, parent, false));
    }


    @Override
    public void onBindViewHolder(@NonNull ProductItemAdapter.ViewHolder holder, int position) {
        holder.bindTo(productItems.get(position));
    }

    @Override
    public int getItemCount() {
        return productItems.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        private CardView productButton;
        private TextView title, description, wattage, price;
        private ImageView banner, wattageIcon;
        private RatingBar ratingBar;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            productButton = (CardView) itemView;
            description = itemView.findViewById(R.id.product_description);
            wattageIcon = itemView.findViewById(R.id.product_wattage_icon);
            ratingBar = itemView.findViewById(R.id.product_rating);
            wattage = itemView.findViewById(R.id.product_wattage);
            banner = itemView.findViewById(R.id.product_banner);
            title = itemView.findViewById(R.id.product_title);
            price = itemView.findViewById(R.id.product_price);
        }

        private void bindTo(ProductItem item) {
            Task<QuerySnapshot> query =
            new HardwareDAO()
                    .getHardwareById(item.getHardwareId())
                    .addOnSuccessListener(queryDocumentSnapshots -> {
                        String type = (String) queryDocumentSnapshots.getDocuments().get(0).get("typeName");
                        item.setHardware((Hardware) queryDocumentSnapshots.getDocuments().get(0).toObject(HardwareType.getClass(type)));

                        Hardware hardware = item.getHardware();
                        String price = hardware.getPrice() + " HUF";
                        String wattage = hardware.getWattage() + "W";

                        title.setText(hardware.getName());
                        ratingBar.setRating(item.getRating());
                        description.setText(hardware.getDescription());
                        this.wattage.setText(wattage);
                        this.price.setText(price);
                        Glide.with(context).load(hardware.getIconId()).into(banner);

                        if ("0W".equals(wattage)) {
                            this.wattage.setText("");
                            wattageIcon.setVisibility(View.GONE);
                        }

                    });
            item.setQuery(query);
        }
    }
}
