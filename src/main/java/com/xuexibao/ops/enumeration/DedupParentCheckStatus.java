package com.xuexibao.ops.enumeration;

public enum DedupParentCheckStatus {
	UCHECK	    (0, "待检查"),
	CHECK 	(1, "已检查"),
	CHECKBACK 	(2, "已回滚");
	
	private DedupParentCheckStatus(int id, String desc) {
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
