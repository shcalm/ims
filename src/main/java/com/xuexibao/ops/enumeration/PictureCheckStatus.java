package com.xuexibao.ops.enumeration;

public enum PictureCheckStatus {
	UCHECK	    (0, "待检查"),
	ELIGIBLE 	(1, "合格"),
	UNELIGIBLE	(2, "不合格");
	
	private PictureCheckStatus(int id, String desc) {
		this.id = id;
		this.desc = desc;
	}

	private int id;
	private String desc;
	public int getId() {
		return id;
	}
	public String getDesc() {
		return desc;
	}

}
